import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostQuery();
  return (
    <>
      <NavBar />
      <div>Hello world</div>
      <br />

      {data && data.posts.map((d) => <div key={d.id}>{d.title}</div>)}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
