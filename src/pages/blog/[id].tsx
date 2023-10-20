/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const parseNumberId = Number(id);

  const detailBlog = api.post.getDetailBlog.useQuery({
    id: parseNumberId,
  });
  console.log(detailBlog.data);

  const deleteBlog = api.post.deleteBlog.useMutation();
  const handleDelete = () => {
    if (window.confirm("本当に？")) {
      try {
        deleteBlog.mutate({ id: parseNumberId });
        void router.push("/")
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold">{detailBlog.data?.title}</h1>
        <div className="mb-8 text-sm text-gray-500">
          <span>{detailBlog.data?.createAt.toLocaleDateString()}</span>{" "}
          {/* Created Atが必要ならば、表示 */}
        </div>
        <p className="whitespace-pre-line text-gray-700">
          {detailBlog.data?.description}
        </p>
        <button
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </main>
  );
};

export default Detail;
