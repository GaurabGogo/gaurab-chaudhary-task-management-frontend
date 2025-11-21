import Image from "next/image";

function NotFound() {
  return (
    <div className="bg-grey-50 h-screen w-full">
      <div className="mx-auto flex h-full max-w-[140rem] items-center justify-center">
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-5xl font-extrabold">404.</h1>
            <h2 className="text-grey-500 text-2xl font-semibold">
              Sorry, page not found
            </h2>
            <p className="text-2xl">
              The Page you are looking for does not exist or an other error
              occurred! That&apos;s all we know.
            </p>
          </div>
          <div className="flex w-full items-center justify-center">
            <Image
              src={"/not-found.jpeg"}
              alt=""
              width={646}
              height={200}
              className="block h-[600px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
