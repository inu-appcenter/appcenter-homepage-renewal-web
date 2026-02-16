export const PageTitle = ({ title, description }: { title: string; description: string }) => {
  return (
    <>
      <h2 className="mb-2 text-4xl font-extrabold tracking-tight">{title}</h2>
      <p className="text-md mt-1 mb-2 text-slate-500">{description}</p>
    </>
  );
};
