import ErrorPage from "./ErrorPage";

function NotFoundPage() {
  return (
    <div className="container relative flex-1 flex flex-col items-center justify-center lg:px-0 h-full">
      <ErrorPage status="404" />
    </div>
  );
}

export default NotFoundPage;
