import Image from "next/image";
import Link from "next/link";

const MainLayout = ({ children }) => {
  return (
    <main className="bg-gray-100 min-h-screen ">
      <Header />
      <div>{children}</div>
    </main>
  );
};

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container lg:mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between mx-4 lg:mx-auto h-full">
          <div className="text-center flex items-center align-items cursor-pointer">
            <Logo />
          </div>

          <div className="text-gray-700 text-center flex items-center align-items">
            <button
              type="button"
              className="bg-blue-medium font-bold text-sm rounded text-black w-20 h-8 mr-1 cursor-default"
            >
              TODO
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <div className="flex justify-center w-full">
      <Link href="/" aria-label="logo">
        <Image src="/next.svg" alt="logo" width={80} height={24} />
      </Link>
    </div>
  );
};

export default MainLayout;
