"use client";

import { memo, useMemo, useEffect, useState } from "react";
import Image from "next/image";
import CakeSvg from "@/components/CakeSvg";
import CandleSvg from "@/components/CandleSvg";
import FireAnimation from "@/components/FireAnimation";

type CandlePosition = {
  id: number;
  x: number;
  y: number;
};

type CakeWithCandlesProps = {
  candles: CandlePosition[];
  onCakeClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  resolvedTheme: string | undefined;
};

// Memoized Candle component để tránh re-render không cần thiết
const Candle = memo(
  ({
    candle,
    resolvedTheme,
    fireAnimationData,
  }: {
    candle: CandlePosition;
    resolvedTheme: string | undefined;
    fireAnimationData: any;
  }) => (
    <div
      key={candle.id}
      className="absolute"
      style={{
        left: `${candle.x}%`,
        top: `${candle.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative w-4 md:w-6">
        <CandleSvg hideFlameHeight={50} />
        {resolvedTheme === "dark" && fireAnimationData && (
          <FireAnimation animationData={fireAnimationData} />
        )}
      </div>
    </div>
  )
);

Candle.displayName = "Candle";

const CakeWithCandles = memo(function CakeWithCandles({
  candles,
  onCakeClick,
  resolvedTheme,
}: CakeWithCandlesProps) {
  // Load Fire.json MỘT LẦN duy nhất cho tất cả nến
  const [fireAnimationData, setFireAnimationData] = useState<any>(null);

  useEffect(() => {
    // Chỉ load khi ở dark mode
    if (resolvedTheme === "dark" && !fireAnimationData) {
      fetch("/Fire.json")
        .then((res) => res.json())
        .then((data) => setFireAnimationData(data))
        .catch((err) => console.error("Error loading fire animation:", err));
    }
  }, [resolvedTheme, fireAnimationData]);

  // Memoize danh sách nến để tránh re-render
  const renderedCandles = useMemo(() => {
    return candles.map((candle) => (
      <Candle
        key={candle.id}
        candle={candle}
        resolvedTheme={resolvedTheme}
        fireAnimationData={fireAnimationData}
      />
    ));
  }, [candles, resolvedTheme, fireAnimationData]);

  return (
    <div className="relative flex flex-col items-center gap-8">
      {/* Mũi tên trỏ vào bánh kem (từ trên xuống) */}
      {candles.length === 0 && (
        <div className="absolute -top-10 left-20 -translate-x-1/2 pointer-events-none z-30">
          <p
            className="absolute text-base font-semibold text-pink-600 dark:text-pink-400 drop-shadow-lg whitespace-nowrap"
            style={{
              top: "-50px",
              left: "-20%",
              transform: "translateX(-50%)",
              rotate: "-30deg",
            }}
          >
            Cắm nến vào đây nhé
          </p>
          <div className="relative w-20 h-20">
            <Image
              src="/arrow.png"
              alt="Arrow pointing to cake"
              fill
              className="object-contain"
              style={{ transform: "rotate(70deg)" }}
            />
          </div>
        </div>
      )}
      <CakeSvg />

      {/* Border để xác định bề mặt bánh kem */}
      <div
        className="absolute rounded-full flex items-center justify-center cursor-pointer"
        style={{
          width: "80%",
          height: "clamp(25%, 30vh, 35%)",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={onCakeClick ? onCakeClick : undefined}
      >
        {/* Render các cây nến đã được thêm */}
        {renderedCandles}
      </div>
    </div>
  );
});

CakeWithCandles.displayName = "CakeWithCandles";

export default CakeWithCandles;
