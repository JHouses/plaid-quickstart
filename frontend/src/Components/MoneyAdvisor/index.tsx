import React, { useState, useEffect } from "react";

import ProductTypesContainer from "../ProductTypes/ProductTypesContainer";
import { ErrorDataItem, ScoreData } from "../../dataUtilities";
import { getScoreFromItem } from "../../utils/getScore";

import styles from "./index.module.scss";

const MoneyAdvisor = () => {
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ScoreData | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await getScoreFromItem();

      if (!response) {
        setError(response);
        setIsLoading(false);
        return;
      }
  
      setData(response);
      setIsLoading(false);
    };
    
    getData();
  }, []);

  return (
    <ProductTypesContainer productType="Fiscal Responsibility Score">
      {isLoading ? (
        <h6> We are loading your score... </h6>
      ) : error ? (
        <h6> Unfortunately an error occurred, please try again later. </h6>
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.scoreContainer}>
              <h3>Your Score</h3>
              <h2>{data?.score}%</h2>
            </div>
            <h5>Based on dates: {data?.dates.startDate} - {data?.dates.endDate}</h5>
          </div>
          <div className={styles.adviceContainer}>
            <h3>Advice:</h3>
            <h4>{data?.advice}</h4>  
          </div>
        </>
      )}
    </ProductTypesContainer>
  );
};

MoneyAdvisor.displayName = "MoneyAdvisor";

export default MoneyAdvisor;
