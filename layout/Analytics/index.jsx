"use client";

import { useState, useEffect, useRef } from "react";

import WidgetsDialog from "#/layout/Analytics/widgets-dialog";
import WidgetsLayout from "#/layout/Analytics/widgets-layout";
import { useUser } from "#/app/my/layout";

export default function Index() {
  const { user } = useUser();

  const [boards, setBoards] = useState({});
  const [value, setValue] = useState(true);

  const boardsDataRef = useRef([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/boards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-TRADIFY-UID": user.id,
      },
    })
      .then((res) => res.json())
      .then((r) => {
        const n = {};
        r.forEach((b) => {
          n[b.title] = b.widgets;
        });
        setBoards(n);
        setValue(Object.keys(n)[0]);
        boardsDataRef.current = r;
      });
  }, []);

  return (
    <>
      <WidgetsDialog
        value={value}
        boards={boards}
        setBoards={setBoards}
        boardsDataRef={boardsDataRef}
      />
      <WidgetsLayout
        value={value}
        boards={boards}
        setValue={setValue}
        setBoards={setBoards}
        boardsDataRef={boardsDataRef}
      />
    </>
  );
}
