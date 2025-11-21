import UnauthorizedErrorComponent from "./UnAuthorizedErrorPage";
import UnknownErrorComponent from "./UnknownError";

export default function ErrorComponent({ error }: { error: any }) {
  return error?.status === 401 ? (
    <UnauthorizedErrorComponent />
  ) : (
    <UnknownErrorComponent />
  );
}
