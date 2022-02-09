import NetInfo from "@react-native-community/netinfo";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";

type Propositions = {
  data: {
    listPropositions: {
      items: any[];
    };
  };
};

export const getPropositions = async (): Promise<Propositions> => {
  try {
    const getPropsToShow = `query getAllProps {
			listPropositions(limit: 100000, filter: {firstPropositions: {eq: 0}, toShowOnSwipe: {eq: 1}}) {
			  items {
				articleContent
				createdAt
				firstPropositions
				id
				idCandidat
				idTheme
				source
				title
				toBeShownFirst
				toShowOnSwipe
			  }
			}
		  }`;

    const getAllPropositions = await API.graphql(
      graphqlOperation(getPropsToShow)
    );

    // console.log(getPropsToShow);

    // TODO fix types
    // @ts-ignore
    return getAllPropositions;
  } catch (e) {
    return null;
  }
};

export const usePropositions = () => {
  const [propositions, setPropositions] = useState([]);
  const [firstPropositionsToShow, setFirstPropositionsToShow] = useState([]);
  const [isConnectedToInternet, setIsConnectedToInternet] = useState(false);

  useEffect(() => {
    (async () => {
      NetInfo.fetch().then(async (state) => {
        if (state.isConnected == true) {
          setIsConnectedToInternet(true);

          console.log("connecté");

          const getFirstPropositions = async () => {
            try {
              const getFirstPropsQuery = `query getFirstProps {
				  listPropositions(limit: 1000, filter: {firstPropositions: {eq: 1}, toShowOnSwipe: {eq: 1}}) {
					items {
					  articleContent
					  createdAt
					  firstPropositions
					  id
					  idCandidat
					  idTheme
					  source
					  title
					  toBeShownFirst
					  toShowOnSwipe
					}
				  }
				}`;

              const getFirstPropositions = await API.graphql(
                graphqlOperation(getFirstPropsQuery)
              );

              return getFirstPropositions;
            } catch (e) {
              console.log(
                "Erreur lors de la récupération des propositions : ",
                e
              );
              return null;
            }
          };

          // TODO : fix amplify types to remove as statement
          const firstPropositions =
            (await getFirstPropositions()) as Propositions;
          setFirstPropositionsToShow(
            firstPropositions.data.listPropositions.items
          );

          // TODO : fix amplify types to remove as statement
          const allPropositions = (await getPropositions()) as Propositions;
          // console.log(allPropositions);
          setPropositions(allPropositions.data.listPropositions.items);
        } else {
          console.log("Aucune connexion internet");
        }
      });
    })();
  }, []);
  return {
    propositions,
    setPropositions,
    firstPropositionsToShow,
    isConnectedToInternet,
  };
};
