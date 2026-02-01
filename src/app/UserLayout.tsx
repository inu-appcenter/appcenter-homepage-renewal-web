import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { FullPageScroll } from 'widgets/scroll';

export function UserLayoutNoScrollAnimation({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-380 px-10 sm:max-w-400 sm:px-20">{children}</main>
      <Footer />
    </>
  );
}

export function UserLayoutScrollAnimation({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <FullPageScroll>
        <main className="mx-auto w-full max-w-380 px-10 sm:max-w-400 sm:px-20">{children}</main>
        <Footer />
      </FullPageScroll>
    </>
  );
}
