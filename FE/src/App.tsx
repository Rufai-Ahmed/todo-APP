import { useEffect, useState } from "react";
import { MdAdd, MdCancel, MdDelete } from "react-icons/md";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import moment from "moment";

function App() {
  const url: string = "https://todo-app-jayh.onrender.com/api";

  const [data, setData] = useState<{}>({});
  const [text, setText] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [parent] = useAutoAnimate();

  const onToggle = () => {
    setToggle(!toggle);
  };

  const fetchData = () => {
    fetch(`${url}/get-all-combine`, {
      method: "GET",
    })
      .then((res: Response) => {
        return res.json();
      })
      .then((res: any) => {
        setData(res.data);
      });
  };

  let title = Object.keys(data);
  let values = Object.values(data);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(text);

  const deleteTask = (ID: string) => {
    fetch(`${url}/delete/${ID}`, {
      method: "DELETE",
    })
      .then((res: Response) => {
        return res.json();
      })
      .then((res) => {
        console.log(res, "update");
      });
  };

  const createTask = () => {
    fetch(`${url}/create`, {
      method: "POST",
      body: JSON.stringify({ title: text }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: Response) => {
        return res.json();
      })
      .then((res) => {
        console.log(res, "update");
      });
  };

  const changeToProgress = (ID: string) => {
    fetch(`${url}/progress/${ID}`, { method: "PATCH" })
      .then((res: Response) => {
        return res.json();
      })
      .then((res) => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        console.log(res, "update");
      });
  };

  const changeToDone = (ID: string) => {
    fetch(`${url}/done/${ID}`, { method: "PATCH" })
      .then((res: Response) => {
        return res.json();
      })
      .then((res) => {
        console.log(res, "update");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  return (
    <div className=" p-2 md:p-8 flex flex-col relative">
      {toggle && (
        <div className="absolute flex flex-col z-20 top-0 w-full h-screen left-0 items-center justify-center backdrop-blur-lg">
          <MdCancel
            className="absolute top-5 right-20 text-5xl text-blue-700 cursor-pointer"
            onClick={onToggle}
          />
          <input
            className="w-[300px] border h-[40px] p-2 bg-white"
            placeholder="text"
            type="text"
            value={text}
            onChange={(e: any) => setText(e.target.value)}
          />
          <button
            onClick={() => {
              createTask();
              // setText("");
              onToggle();
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }}
            className="w-[300px] border h-[40px] p-2 bg-blue-800 mt-5 text-white mb-20"
          >
            Add
          </button>
        </div>
      )}

      <center className="text-[30px] mb-5 font-bold">TODO Application</center>

      <div className="w-full flex justify-center">
        <div className="border rounded-md w-full md:w-[90%] p-4 grid-cols-3 grid">
          <div className="grid grid-cols-3 col-span-3 gap-2 md:gap-4">
            {title?.map((el: string, i: number) => (
              <div
                key={i}
                className="border rounded-md flex items-center justify-between px-3 py-2 "
              >
                <span className="font-bold capitalize">{el}</span>
                {el === "task" && (
                  <MdAdd
                    className="cursor-pointer text-[25px]"
                    onClick={onToggle}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            ref={parent}
            className="mt-6 col-span-3 gap-2 md:gap-5 grid grid-cols-3"
          >
            {values.map((el: any) => (
              <div>
                {el.map((props: any) => (
                  <main className="border cursor-pointer group rounded-md my-2 p-2 relative transition-all duration-300">
                    <MdDelete
                      className="absolute top-2 opacity-0 right-3 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                      onClick={() => deleteTask(props?._id)}
                    />
                    <p className="font-bold text-[18px] mb-1">{props.title}</p>
                    <p className=" text-[12px] mb-1">
                      {" "}
                      {moment(props.createdAt).fromNow()}
                    </p>

                    <div className="flex justify-end">
                      {!props?.done && (
                        <button
                          onClick={() =>
                            !props?.progress && !props?.done
                              ? changeToProgress(props?._id)
                              : props?.progress && !props?.done
                              ? changeToDone(props?._id)
                              : changeToDone(props?._id)
                          }
                          className={`py-1 px-2 mt-2b md:px-8 text-white rounded-md cursor-pointer font-bold text-[12px] tracking-widest ${
                            props.progress && !props?.done
                              ? "bg-orange-500"
                              : props?.progress && props.done
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {props?.progress ? "Progress" : "start"}
                        </button>
                      )}
                    </div>
                  </main>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
