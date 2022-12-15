import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";

const QUERY = gql`
  query GetChess {
    getChess {
      title
    }
  }
`;

const MUTATION = gql`
  mutation ChangeName($title: String!) {
    changeName(title: $title) {
      title
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription Subscription {
    titleChanged {
      title
    }
  }
`;

const Titles = () => {
  const [inputValue, setInputValue] = useState("");
  const [titles, setTitles] = useState<string[]>([]);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(QUERY);
  const [
    mutateFunction,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(MUTATION);
  const {
    data: subscriptionData,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useSubscription(SUBSCRIPTION);

  const queryTitle = queryData?.getChess?.title;
  // const mutatedTitle = mutationData?.changeName?.title;
  const subscribedData = subscriptionData?.titleChanged?.title;

  useEffect(() => {
    if (queryTitle) {
      setTitles([queryTitle]);
    }
  }, [queryTitle]);

  useEffect(() => {
    if (subscribedData) {
      setTitles((prev) => [...prev, subscribedData]);
    }
  }, [subscribedData]);

  if (queryLoading || mutationLoading) {
    return <h2 className="mx-auto text-center">Loading...</h2>;
  }

  if (queryError || mutationError || subscriptionError) {
    console.error(queryError || mutationError || subscriptionError);
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center">
      {titles.map((title, index) => (
        <div key={index}>{title}</div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutateFunction({ variables: { title: inputValue } });
          setInputValue("");
        }}
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-[200px] border mr-2 mt-2"
          placeholder="Type here"
        ></input>
        <button disabled={inputValue === ""}>Submit</button>
      </form>
    </div>
  );
};

export default Titles;
