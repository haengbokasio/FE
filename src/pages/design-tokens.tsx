import React from "react";

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-10 w-10 rounded ${className}`} />
      <code className="text-sm">{name}</code>
    </div>
  );
}

function DesignTokensDebug() {
  return (
    <section className="w-full max-w-2xl space-y-6 p-6">
      <h2 className="text-xl font-semibold">Design Tokens Debug</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Swatch name="bg-primary-50" className="bg-primary-50" />
        <Swatch name="bg-primary-100" className="bg-primary-100" />
        <Swatch name="bg-primary-200" className="bg-primary-200" />
        <Swatch name="bg-primary-300" className="bg-primary-300" />
        <Swatch name="bg-primary-400" className="bg-primary-400" />
        <Swatch name="bg-primary-500" className="bg-primary-500" />
        <Swatch name="bg-secondary-50" className="bg-secondary-50" />
        <Swatch name="bg-secondary-100" className="bg-secondary-100" />
      </div>

      <div className="rounded p-4 bg-foreground text-background">
        bg-foreground / text-background 박스
      </div>

      <div className="space-y-2">
        <p className="font-sans">font-sans 샘플 텍스트 (Geist Sans?)</p>
        <p className="font-mono">font-mono 샘플 코드폰트 (Geist Mono?)</p>
      </div>
    </section>
  );
}

export default function DesignTokensPage() {
  return <DesignTokensDebug />;
}
