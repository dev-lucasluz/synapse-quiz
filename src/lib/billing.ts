/**
 * lib/billing.ts
 *
 * Camada de negócio de planos e cotas.
 * Toda a lógica de "o que o usuário pode fazer" fica aqui —
 * não espalhada pelos componentes.
 *
 * Quando a integração Stripe for implementada:
 *  1. Instale: npm install stripe
 *  2. Descomente o bloco Stripe abaixo
 *  3. Configure as env vars no .env.local
 *  4. Crie o webhook em /api/stripe/webhook/route.ts
 */

// import Stripe from "stripe";
//
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
//   typescript: true,
// });

// ─── Definição dos planos ────────────────────────────────────────────────────

export type Plan = "free" | "pro";

export interface PlanConfig {
  id: Plan;
  name: string;
  description: string;
  priceMonthly: number | null; // null = grátis
  features: {
    dailyQuotaBase: number;      // Questões base por dia
    dailyQuotaMax: number;       // Teto absoluto (referral incluído)
    notebookQuota: number;       // Cota do caderno de erros
    referralBonusPerSlot: number; // +N questões por indicação
    referralSlots: number;        // Quantas indicações valem bônus
    accessProQuestions: boolean;  // Questões premium desbloqueadas
    advancedStats: boolean;       // Estatísticas avançadas
    customFilters: boolean;       // Filtros por banca/período/dificuldade
    noAds: boolean;
  };
}

export const PLANS: Record<Plan, PlanConfig> = {
  free: {
    id: "free",
    name: "Gratuito",
    description: "Para começar a estudar com repetição espaçada",
    priceMonthly: null,
    features: {
      dailyQuotaBase: 10,
      dailyQuotaMax: 20,
      notebookQuota: 20,
      referralBonusPerSlot: 5,
      referralSlots: 2,
      accessProQuestions: false,
      advancedStats: false,
      customFilters: false,
      noAds: false,
    },
  },
  pro: {
    id: "pro",
    name: "Pro",
    description: "Para quem quer dominar o internato e a residência",
    priceMonthly: 29.9, // R$ 29,90/mês — ajuste conforme estratégia de pricing
    features: {
      dailyQuotaBase: 9999,   // Ilimitado (usamos valor alto)
      dailyQuotaMax: 9999,
      notebookQuota: 9999,
      referralBonusPerSlot: 5,
      referralSlots: 2,
      accessProQuestions: true,
      advancedStats: true,
      customFilters: true,
      noAds: true,
    },
  },
};

// ─── Helpers de quota ────────────────────────────────────────────────────────

/**
 * Retorna a cota diária máxima de um usuário levando em conta:
 *  - Seu plano (free/pro)
 *  - Quantas indicações confirmadas ele tem
 */
export function getDailyQuota(
  plan: Plan,
  referralCount: number
): { mainMax: number; notebookMax: number } {
  const config = PLANS[plan].features;

  if (plan === "pro") {
    return {
      mainMax: config.dailyQuotaMax,
      notebookMax: config.notebookQuota,
    };
  }

  // free: bônus de referral
  const bonus = Math.min(referralCount, config.referralSlots) * config.referralBonusPerSlot;
  const mainMax = Math.min(config.dailyQuotaBase + bonus, config.dailyQuotaMax);

  return { mainMax, notebookMax: config.notebookQuota };
}

/**
 * Verifica se o usuário pode acessar uma questão com base no accessLevel dela.
 */
export function canAccessQuestion(
  userPlan: Plan,
  questionAccessLevel: string
): boolean {
  if (questionAccessLevel === "free") return true;
  if (questionAccessLevel === "pro" && userPlan === "pro") return true;
  return false;
}

// ─── Criação de sessão de checkout Stripe (stub) ─────────────────────────────
// Descomente e implemente quando for integrar Stripe.
//
// export async function createCheckoutSession({
//   userId,
//   email,
//   priceId,
//   successUrl,
//   cancelUrl,
// }: {
//   userId: string;
//   email: string;
//   priceId: string;
//   successUrl: string;
//   cancelUrl: string;
// }) {
//   // 1. Busca ou cria o customer no Stripe
//   const user = await prisma.user.findUnique({ where: { id: userId } });
//   let customerId = user?.stripeCustomerId;
//
//   if (!customerId) {
//     const customer = await stripe.customers.create({ email, metadata: { userId } });
//     customerId = customer.id;
//     await prisma.user.update({
//       where: { id: userId },
//       data: { stripeCustomerId: customerId },
//     });
//   }
//
//   // 2. Cria a sessão de checkout
//   const session = await stripe.checkout.sessions.create({
//     customer: customerId,
//     payment_method_types: ["card"],
//     line_items: [{ price: priceId, quantity: 1 }],
//     mode: "subscription",
//     success_url: successUrl,
//     cancel_url: cancelUrl,
//     metadata: { userId },
//   });
//
//   return session;
// }

// ─── Handler de webhook Stripe (stub) ────────────────────────────────────────
// Crie /api/stripe/webhook/route.ts com este conteúdo ao integrar:
//
// export async function POST(req: Request) {
//   const body = await req.text();
//   const sig = req.headers.get("stripe-signature")!;
//
//   let event: Stripe.Event;
//   try {
//     event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
//   } catch {
//     return new Response("Webhook signature invalid", { status: 400 });
//   }
//
//   switch (event.type) {
//     case "checkout.session.completed": {
//       const session = event.data.object as Stripe.Checkout.Session;
//       const userId = session.metadata!.userId;
//       const sub = await stripe.subscriptions.retrieve(session.subscription as string);
//       await prisma.$transaction([
//         prisma.user.update({ where: { id: userId }, data: { plan: "pro", stripeSubscriptionId: sub.id } }),
//         prisma.subscription.upsert({
//           where: { userId },
//           create: { userId, stripeSubscriptionId: sub.id, stripePriceId: sub.items.data[0].price.id, stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000), status: "active" },
//           update: { status: "active", stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000) },
//         }),
//       ]);
//       break;
//     }
//     case "customer.subscription.deleted": {
//       const sub = event.data.object as Stripe.Subscription;
//       await prisma.$transaction([
//         prisma.user.updateMany({ where: { stripeSubscriptionId: sub.id }, data: { plan: "free" } }),
//         prisma.subscription.updateMany({ where: { stripeSubscriptionId: sub.id }, data: { status: "canceled" } }),
//       ]);
//       break;
//     }
//   }
//
//   return new Response("ok");
// }
