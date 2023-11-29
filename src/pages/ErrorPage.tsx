import { useRouteError } from "react-router-dom";
import Text from "../components/common/Typography/Text";
import Layout from "../components/layout/Layout";

type Error = {
  statusText: string;
  message: string;
  data: string;
};

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.log(error);
  return (
    <Layout>
      <div className="h-[80vh] w-screen flex flex-col items-center justify-center">
        <Text main text="Opps!" weight="light" className="mb-6" />
        <Text
          title
          text={error.statusText}
          weight="semibold"
          className="mb-6"
        />
        <Text body weight="medium" className="mb-6">
          <i>{error.data}</i>
        </Text>
      </div>
    </Layout>
  );
}
