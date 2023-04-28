import { useRouter } from "next/router";

export const Redirect: React.FunctionComponent<{ to: string }> = ({ to }) => {
  const router = useRouter();
  router.replace(to);
  return null;
};
