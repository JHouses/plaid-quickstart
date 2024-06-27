import React, { useState, useEffect } from "react";

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

      if (response.error) {
        setError(response.error);
        setIsLoading(false);
        return;
      }
  
      setData(response);
      setIsLoading(false);
    };
    
    getData();
  }, []);

  const scorePartParseInt = (score: string) => parseInt(score, 10);

  return (
    <div className={styles.advisorContainer}>
      {isLoading ? (
        <h6 className={styles.adviceDescription}> We are loading your score... </h6>
      ) : error || !data ? (
        <>
          <h6 className={styles.adviceDescription}> Unfortunately an error occurred, please try again later. </h6>
          <h6 className={styles.adviceDescription}> <strong> Error: </strong> {error?.error_message} </h6>
        </>
      ) : (
        <>
          <h4 className={styles.advisorTitle}>Your Result</h4>
          <div className={styles.advisorScoreContainer}>
            <p className={styles.advisorScore}>{scorePartParseInt(data?.score)}</p>
            <p className={styles.advisorTotal}>of 100%</p>
          </div>
          <p className={styles.advisorDates}>
            <strong>Based on dates: </strong>
            {data?.dates.startDate} - {data?.dates.endDate}
          </p>
          <div className={styles.adviceContainer}>
            <h3 className={styles.adviceTitle}>Advice:</h3>
            <h5 className={styles.adviceDescription}>{data?.advice}</h5>
          </div>
        </>
      )}
    </div>
  );
};

MoneyAdvisor.displayName = "MoneyAdvisor";

export default MoneyAdvisor;
