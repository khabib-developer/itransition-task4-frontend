import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import date from "date-and-time";
import { useActions } from "../../hooks/redux/useActions";
import { IUser } from "../../interfaces";
import { useHttp } from "../../hooks/http";
import { Logout } from "../../hooks/auth";

export const Main: React.FC = (): any => {
  const app = useTypedSelector((store) => store.app);
  const http = useHttp();
  const logout = Logout();
  const actions = useActions();
  const navigate = useNavigate();
  const [permission, setpermission] = useState<boolean>(false);
  const [checked, setchecked] = useState<any>({});
  useEffect(() => {
    if (!(app.token && app.user)) navigate("/login");
    setpermission(true);
  }, [app.token, app.user, navigate]);

  const handleChange = () => {
    const bool =
        Object.values(checked).filter((e) => e).length === app.users.length,
      a: any = {};
    app.users.forEach((user) => (a[user.id] = !bool));
    setchecked(a);
  };

  const handleUpdate = async (blocked: boolean) => {
    let updatedUsers: IUser[] = [];
    for (const key in checked) {
      if (Object.prototype.hasOwnProperty.call(checked, key)) {
        if (checked[key]) {
          updatedUsers.push({
            ...app.users.find((user: any) => +user!.id! === +key)!,
            blocked,
          });
        }
      }
    }
    if (updatedUsers.length > 0) {
      let nextUsers = app.users;
      const result = await http("/user/update", "POST", updatedUsers);
      const users = result.map((e: any) => e.value);
      if (users.find((user: IUser) => user.id === app.user!.id)?.blocked) {
        logout();
      }
      users.forEach((user: IUser) => {
        nextUsers = [
          ...nextUsers.filter((prevUser: IUser) => user.id !== prevUser!.id),
          user,
        ];
      });
      actions.setUsers(nextUsers);
    }
  };

  const handleDelete = async () => {
    const deletedUsers: number[] = [];
    let nextUsers = app.users;
    for (const key in checked) {
      if (Object.prototype.hasOwnProperty.call(checked, key)) {
        if (checked[key]) {
          deletedUsers.push(+key);
        }
      }
    }
    const result = await http("/user/delete", "POST", deletedUsers);
    result.forEach((id: number) => {
      if (app!.user!.id === id) logout();
      nextUsers = [...nextUsers.filter((user: IUser) => user.id !== id)];
    });
    actions.setUsers(nextUsers);
  };

  if (!permission)
    return (
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        loading...
      </div>
    );
  return (
    <div
      className="w-100 d-flex justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="container pt-5">
        <div className="d-flex pt-5 pb-3">
          <Button
            className="px-3 bg-danger text-white"
            startIcon={<LockIcon />}
            onClick={() => handleUpdate(true)}
          >
            Block
          </Button>
          <Button
            className="px-2 bg-secondary text-white mx-4"
            onClick={() => handleUpdate(false)}
          >
            <LockOpenIcon />
          </Button>
          <Button
            className="px-2 bg-secondary text-white"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={
                      Object.values(checked).filter((e) => e).length ===
                      app.users.length
                    }
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
                <TableCell>id</TableCell>
                <TableCell align="left">e-mail</TableCell>
                <TableCell align="left">name</TableCell>
                <TableCell align="left">registration time</TableCell>
                <TableCell align="left">last login time</TableCell>
                <TableCell align="left">status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {app.users
                .sort((a, b) => a.id - b.id)
                .map((user) => {
                  return (
                    <TableRow
                      key={user.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Checkbox
                          checked={!!checked[user.id]}
                          onChange={() =>
                            setchecked((prev: any) => ({
                              ...prev,
                              [user.id]: !prev[user.id],
                            }))
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.email}
                      </TableCell>
                      <TableCell align="left">{user.name}</TableCell>
                      <TableCell align="left">
                        {date.format(
                          new Date(user!.createdAt!),
                          "YY-MM-DD HH:mm:ss"
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {date.format(
                          new Date(user!.updatedAt!),
                          "YY-MM-DD HH:mm:ss"
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {user.blocked ? (
                          <span className="text-danger">blocked</span>
                        ) : (
                          <span className="text-success">active</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
