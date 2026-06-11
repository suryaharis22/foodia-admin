// import { Helmet } from 'react-helmet';
import { Helmet, HelmetProvider } from "react-helmet-async";
import icon from "../../../favicon.ico";
type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <HelmetProvider>
    <div>
      <Helmet>
        <title>Foodia Admin</title>
        <link rel="icon" href="../../../favicon.ico" />
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </div>
  </HelmetProvider>
);

export default PageContainer;
