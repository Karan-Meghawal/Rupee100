import IconifyIcons from "@/IconifyIcons";
import DebouncedInput from "@/components/DebounceInput";
import Iconify from "@/components/Iconify";
import { userApi } from "@/utils/api";
import createAvatar from "@/utils/createAvatar";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Avatar from "@/components/Avatar";
import { type TransferUserData } from "./QuickTransfer";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TransferUserData) => void;
};

const SearchUserDialog = ({ open, onClose, onSubmit }: Props) => {
  const [search, setSearch] = useState("");
  const onSearch = (text: string) =>
    text && text.trim() ? setSearch(text) : setSearch("");

  const { data, isFetching } =
    userApi.transferPayment.searchUser.useQuery(search);
  const result = data ?? [];

  const handleSubmit = (
    userName: string,
    userId: number,
    firstName: string,
    lastName: string,
    avatar: string,
  ) => {
    onSubmit({ userName, userId, firstName, lastName, avatar });
  };

  return (
    <Dialog
      maxWidth={"xs"}
      scroll="paper"
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Search User</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 4 }}>
          <DebouncedInput
            fullWidth
            placeholder="Search...  UserId/Username"
            InputProps={{
              startAdornment: (
                <Iconify
                  color="text.secondary"
                  sx={{ mr: 2, fontSize: 24 }}
                  icon={IconifyIcons.search}
                />
              ),
            }}
            onChange={onSearch}
          />
        </Box>
        <Stack spacing={3}>
          {isFetching && <LinearProgress />}

          {!search && (
            <Box>
              <Typography
                color="text.secondary"
                variant="subtitle1"
              >
                Recent Transfer
              </Typography>
            </Box>
          )}

          {result.length ? (
            result.map(({ userName, userId, firstName, lastName, avatar }) => (
              <Stack
                key={userId}
                direction="row"
                justifyContent="space-between"
              >
                <Stack
                  direction="row"
                  spacing={2}
                >
                  <Avatar
                    color={avatar ? "default" : createAvatar(firstName).color}
                    src={avatar}
                  >
                    {createAvatar(firstName).name}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">
                      {firstName} {lastName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {userId} - {userName}
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  onClick={() =>
                    handleSubmit(
                      userName,
                      userId,
                      firstName,
                      lastName,
                      avatar ?? "",
                    )
                  }
                  startIcon={<Iconify icon={IconifyIcons.add} />}
                >
                  Assign
                </Button>
              </Stack>
            ))
          ) : (
            <>
              {search ? (
                <Box>No users found</Box>
              ) : (
                <Box>No recent payment transfer was made</Box>
              )}
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default SearchUserDialog;
