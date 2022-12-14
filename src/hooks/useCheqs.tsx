import React, { useEffect, useMemo, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useBlockchainData, APIURL } from "../context/BlockchainDataProvider";

interface Props {
  cheqField: string;
}

export const useCheqs = ({ cheqField }: Props) => {
  const { blockchainState } = useBlockchainData();
  const account = blockchainState.account;
  const [cheqsReceived, setCheqReceived] = useState<any>();
  const [cheqsSent, setCheqsSent] = useState<any>();

  useEffect(() => {
    if (account) {
      // TODO: replace with where _or clause on cheqs
      const tokenQuery = `
      query accounts($account: String ){
        accounts(where: { id: $account }, first: 1)  {
          cheqsSent {
            id
            createdAt
            amount
            expiry
            ercToken {
              id
            }
            status
            transactionHash
            drawer {
              id
            }
            recipient {
              id
            }
            auditor {
              id
            }
          }
          cheqsReceived {
            id
            createdAt
            amount
            expiry
            ercToken {
              id
            }
            status
            transactionHash
            drawer {
              id
            }
            recipient {
              id
            }
            auditor {
              id
            }
          }
        }
      }
      `;

      const client = new ApolloClient({
        uri: APIURL,
        cache: new InMemoryCache(),
      });
      client
        .query({
          query: gql(tokenQuery),
          variables: {
            account: account.toLowerCase(),
          },
        })
        .then((data) => {
          if (data["data"]["accounts"][0]) {
            setCheqsSent(data["data"]["accounts"][0]["cheqsSent"]);
            setCheqReceived(data["data"]["accounts"][0]["cheqsReceived"]);
          } else {
            setCheqsSent(null);
            setCheqReceived(null);
          }
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
    }
  }, [account]);

  const cheqs = useMemo(() => {
    switch (cheqField) {
      case "cheqsSent":
        return cheqsSent as any[];
      case "cheqsReceived":
        return cheqsReceived as any[];
      default:
        return cheqsReceived.concat(cheqsSent) as any[];
    }
  }, [cheqField]);

  return { cheqs };
};
