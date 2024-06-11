export const Debug = () =>
  process.env.NODE_ENV === "production" ? null : (
    <div className="w-12 aspect-square rounded-full fixed bottom-6 left-6 bg-background grid place-items-center shadow-lg">
      <span className="sm:hidden">xs</span>
      <span className="hidden sm:block md:hidden">sm</span>
      <span className="hidden md:block lg:hidden">md</span>
      <span className="hidden lg:block xl:hidden">lg</span>
      <span className="hidden xl:block">lg</span>
    </div>
  );
