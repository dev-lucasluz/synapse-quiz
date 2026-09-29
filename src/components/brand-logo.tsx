/**
 * Logo do Synapse Quiz (gerada por script a partir das curvas da fonte Bree Serif; o texto
 * é desenhado em curvas, então não depende de nenhuma fonte carregada).
 * - SynapseMark: só o símbolo (o "S sináptico").
 * - SynapseWordmark: só o nome. "Synapse" usa a cor do texto atual; "Quiz" é laranja.
 * - SynapseLogo: símbolo + nome lado a lado.
 */
import React, { useId } from "react";
import { cn } from "@/lib/utils";

type MarkVariant = "color" | "white" | "current";

export function SynapseMark({ className, variant = "color" }: { className?: string; variant?: MarkVariant }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradId = `sg${id}`;
  const fill = variant === "color" ? `url(#${gradId})` : variant === "white" ? "#ffffff" : "currentColor";
  return (
    <svg viewBox="44 8 112 184" className={className} aria-hidden="true" focusable="false">
      {variant === "color" && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f59e0b" />
            <stop offset="0.55" stopColor="#ea580c" />
            <stop offset="1" stopColor="#c2410c" />
          </linearGradient>
        </defs>
      )}
      <path d="M130.7,40.0 A39,39 0 1,0 70.1,89.1" fill="none" stroke={fill} strokeWidth="23" strokeLinecap="round"/><path d="M129.9,110.9 A39,39 0 1,1 69.3,160.0" fill="none" stroke={fill} strokeWidth="23" strokeLinecap="round"/><circle cx="100" cy="100" r="9" fill={fill}/>
    </svg>
  );
}

export function SynapseWordmark({ className, accent = true }: { className?: string; accent?: boolean }) {
  return (
    <svg viewBox="-2 -49.0 429.8 68.0" className={className} role="img" aria-label="Synapse Quiz">
      <g className="fill-current">
        <path transform="translate(0.00 0) scale(0.06917 -0.06917)" d="M241 90Q361 90 361 186Q361 236 308 260Q280 274 235.5 286Q191 298 161.5 310.5Q132 323 102 345Q43 389 43 480.5Q43 572 106.5 624.5Q170 677 272.5 677Q375 677 463 636L463 486L361 479L361 537Q361 552 357 559Q346 578 286.5 578Q227 578 198.5 557Q170 536 170 492Q170 460 194 436Q210 420 241.5 409.5Q273 399 308.5 388Q344 377 371.5 364Q399 351 429 328Q490 283 490 189Q490 95 422.5 41Q355 -13 244.5 -13Q134 -13 46 28L46 186L148 193L148 132Q148 117 152 110Q156 103 176.5 96.5Q197 90 241 90Z"/>
        <path transform="translate(37.49 0) scale(0.06917 -0.06917)" d="M401 19L401 95Q346 17 239 17Q84 17 84 190L84 391Q84 418 59 419L27 421L27 503L203 503L203 216Q203 163 218 136Q233 109 280 109Q327 109 355.5 138Q384 167 384 208L384 389Q384 406 378.5 412.5Q373 419 359 419L327 421L327 503L503 503L503 19Q503 -102 444.5 -158Q386 -214 267.5 -214Q149 -214 83 -181L83 -42L178 -34L178 -82Q178 -109 203 -118.5Q228 -128 272 -128Q401 -128 401 19Z"/>
        <path transform="translate(78.51 0) scale(0.06917 -0.06917)" d="M27 423L27 503L196 503L196 438Q222 475 265 496.5Q308 518 358 518Q434 518 475.5 474.5Q517 431 517 344L517 83L574 80L574 0L336 0L336 76L369 79Q384 81 391 87.5Q398 94 398 112L398 318Q398 373 381 399.5Q364 426 316.5 426Q269 426 241 396Q213 366 213 325L213 83L270 80L270 0L32 0L32 76L65 79Q80 81 87 87.5Q94 94 94 112L94 389Q94 419 69 420Z"/>
        <path transform="translate(121.40 0) scale(0.06917 -0.06917)" d="M482 483L482 111Q482 95 487.5 89Q493 83 507 82L539 80L539 0L380 0L380 58L377 59Q327 -13 240 -13Q138 -13 89 52Q40 117 40 230Q40 366 106 442Q172 518 304 518Q389 518 482 483ZM366 159L366 418Q338 431 289 431Q222 431 192 377Q162 323 162 234Q162 72 266 72Q310 72 338 98.5Q366 125 366 159Z"/>
        <path transform="translate(161.31 0) scale(0.06917 -0.06917)" d="M89 -95L89 389Q89 406 83.5 412.5Q78 419 64 419L22 422L22 503L191 503L191 438Q207 468 249 493Q291 518 349 518Q530 518 530 264Q530 129 471 57Q412 -15 311 -15Q251 -15 204 14L204 -124L285 -128L285 -207L27 -207L27 -131L60 -128Q75 -126 82 -119.5Q89 -113 89 -95ZM406 254Q406 421 305 421Q263 421 233.5 395.5Q204 370 204 335L204 105Q242 80 296.5 80Q351 80 378.5 130Q406 180 406 254Z"/>
        <path transform="translate(201.98 0) scale(0.06917 -0.06917)" d="M295 427Q271 436 237 436Q203 436 182.5 420.5Q162 405 162 382.5Q162 360 169.5 347.5Q177 335 193 326Q218 313 253 303.5Q288 294 305 288.5Q322 283 347.5 270Q373 257 386 242Q421 205 421 147Q421 72 366.5 29.5Q312 -13 228 -13Q106 -13 44 18L44 157L134 164L134 116Q134 72 218 72Q302 72 302 133Q302 155 287.5 169Q273 183 259 188Q245 193 225.5 198Q206 203 187.5 208Q169 213 147.5 221.5Q126 230 100 246Q49 279 49 356.5Q49 434 104 476Q159 518 242.5 518Q326 518 408 478L408 358L318 351L318 393Q318 418 295 427Z"/>
        <path transform="translate(234.57 0) scale(0.06917 -0.06917)" d="M284 518Q359 518 403 481.5Q447 445 447 379Q447 335 428 301.5Q409 268 381 249Q353 230 313 218Q246 198 162 198Q165 145 195 112.5Q225 80 287 80Q349 80 411 124L449 43Q429 25 381.5 6Q334 -13 273 -13Q151 -13 94 54.5Q37 122 37 240Q37 358 102 438Q167 518 284 518ZM238.5 289.5Q238.5 289.5 256.75 292.75Q275 296 306 318.5Q337 341 337 372Q337 433 277 433Q221 433 191 388.5Q161 344 158 282Q202 283 238.5 289.5Z"/>
      </g>
      <g className={accent ? "fill-orange-600 dark:fill-amber-400" : "fill-current"}>
        <path transform="translate(280.93 0) scale(0.06917 -0.06917)" d="M623 331Q623 202 568.5 119Q514 36 411 9L411 6Q488 2 558 -40Q608 -71 675 -71Q690 -71 706 -69L694 -165Q680 -166 667 -166L568 -149Q505 -127 445 -99Q377 -67 319 -67Q291 -67 263 -73L277 -1Q39 30 39 331Q39 423 66 492.5Q93 562 138 600Q226 677 344.5 677Q463 677 543 593Q623 509 623 331ZM164 336Q164 88 336 88Q428 88 466 164Q499 231 499 328Q499 415 468 488Q452 528 417.5 551Q383 574 328 574Q273 574 233.5 538Q194 502 179 451Q164 400 164 336Z"/>
        <path transform="translate(328.24 0) scale(0.06917 -0.06917)" d="M563 79L563 0L401 0L401 65Q346 -13 239 -13Q84 -13 84 160L84 391Q84 418 59 419L27 421L27 503L203 503L203 186Q203 133 218 106Q233 79 280 79Q327 79 355.5 108Q384 137 384 178L384 389Q384 405 378.5 411.5Q373 418 359 419L327 421L327 503L503 503L503 111Q503 95 508 89.5Q513 84 528 82Z"/>
        <path transform="translate(370.50 0) scale(0.06917 -0.06917)" d="M214 503L214 83L271 80L271 0L33 0L33 76L66 79Q95 82 95 111L95 389Q95 406 89.5 412Q84 418 70 418L35 420L35 503ZM88 589.5Q88 589.5 77.5 599.75Q67 610 67 642Q67 674 88 695.5Q109 717 143 717Q177 717 198.5 695.5Q220 674 220 642Q220 610 198.5 589.5Q177 569 143 569Q109 569 88 589.5Z"/>
        <path transform="translate(392.36 0) scale(0.06917 -0.06917)" d="M448 0L40 0L40 76L297 414L171 414Q150 414 144.5 406Q139 398 139 380L139 345L45 352L45 503L443 503L443 435L183 90L325 90Q354 90 354 124L354 166L448 159Z"/>
      </g>
    </svg>
  );
}

export function SynapseLogo({ className, markClassName, wordmarkClassName, variant = "color" }: { className?: string; markClassName?: string; wordmarkClassName?: string; variant?: MarkVariant }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SynapseMark variant={variant} className={cn("h-9 w-auto shrink-0", markClassName)} />
      <SynapseWordmark accent={variant !== "white"} className={cn("h-5 w-auto", wordmarkClassName)} />
    </span>
  );
}
