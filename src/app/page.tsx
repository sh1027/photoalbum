import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main className="flex flex-col bg-neutral-100 w-full min-h-screen">
      <div className="sticky top-0 z-10">
        <Nav />
      </div>
      <div className="max-w-screen-lg mx-auto flex flex-col py-10 space-y-8 items-center">
        <h1 className="text-2xl text-neutral-900">Top</h1>
        <p className="text-base font-light text-neutral-800">Coming soon...</p>
      </div>
    </main>
  );
}
