export default function CartHeader() {
  return (
    <div className="mt-40 mb-10 w-full bg-gradient-to-r from-green-300 via-white to-blue-300 dark:from-[#0A2025] dark:to-[#102D3F] py-14 px-6 text-center rounded-xl shadow-sm">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#191919] dark:text-white mb-4">
          Mon Panier
        </h1>
        <p className="text-lg text-[#4c4c4c] dark:text-gray-300">
          Retrouvez ici tous les articles que vous avez ajoutés.
        </p>
      </div>
    </div>
  );
}
