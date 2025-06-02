/**
 * QS: Infinite Scroll
 */

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const fetchAPI = async ({ limit, skip }) => {
  const data = await fetch(
    `https://dummyjson.com/users?skip=${skip}&limit=${+limit}`
  );
  const parsedData = await data?.json();
  return parsedData;
};

function App() {
  const loadMoreRef = useRef(null);
  const [users, setUsers] = useState([]);
  const skip = useRef(0);
  useEffect(() => {
    (async () => {
      const data = await fetchAPI({ limit: 30, skip: skip.current });
      console.log("data", data);
      setUsers((prev) => [...prev, ...data?.users]);
    })();
  }, []);

  const refetch = async () => {
    const data = await fetchAPI({
      limit: 30,
      skip: skip.current,
    });
    setUsers((prev) => [...prev, ...data?.users]);
    skip.current += 30;
  };

  useEffect(() => {
    (async () => {
      const instOb = new IntersectionObserver(
        async (entries) => {
          console.log("entries", entries[0].isIntersecting);
          if (entries[0].isIntersecting) {
            await refetch();
          }
        },
        { threshold: 0.25 }
      );

      instOb.observe(loadMoreRef.current);
    })();
  }, []);

  return (
    <>
      {users?.map((item, idx) => {
        return (
          <div key={item.lastName + idx}>
            <div style={{ margin: "10px 0" }}>
              {item?.id}{" "}
              {item?.firstName + " " + item?.maidenName + " " + item?.lastName}
              <img src={item?.image} width="50px" height="50px" />
            </div>
          </div>
        );
      })}
      <div id="loadmore" ref={loadMoreRef}>
        LoadMore
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
