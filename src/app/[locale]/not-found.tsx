import { Link } from "@/i18n/navigation";
export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
      <Link href="/" className="mt-6 inline-block text-blue underline">Home</Link>
    </div>
  );
}
