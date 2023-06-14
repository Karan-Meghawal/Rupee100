import Avatar from "@/components/Avatar";
import { type GenealogyUser } from "@/pages/u/network/genealogy";
import createAvatar from "@/utils/createAvatar";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { type OrgChart } from "d3-org-chart";
import { useState, type SyntheticEvent } from "react";

const SearchAutoComplete = ({
  chart,
  nodes: nodesData,
}: {
  chart: OrgChart<GenealogyUser> | null;
  nodes: GenealogyUser[] | undefined;
}) => {
  const nodes = nodesData ?? [];

  const validNodes = nodes.filter((node) => node.isValid === true);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: string,
  ) => {
    setInputValue(newInputValue);
  };

  const [value, setValue] = useState<GenealogyUser | null>(null);
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: GenealogyUser | null,
  ) => {
    if (newValue && chart) {
      const { id } = newValue;
      chart.clearHighlighting();
      chart.setHighlighted(id).render();
    }
    setValue(newValue);
  };

  // todo: implement
  // useEffect(() => {
  //   if (!value) chart?.clearHighlighting?.();
  // }, [chart, value]);

  return (
    <Box
      sx={{
        m: 2,
        position: "absolute",
        textAlign: "right",
        width: 1,
        right: 0,
        maxWidth: 300,
        zIndex: 2,
        background: "inherit",
      }}
    >
      <Autocomplete
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        sx={{ width: 300 }}
        options={validNodes}
        autoHighlight
        getOptionLabel={(option) =>
          `${option.userName} ${option.userId}` ?? crypto.randomUUID()
        }
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <Avatar
              alt={option.userName}
              src={option.avatar}
              color={
                option.avatar ? "default" : createAvatar(option.userName).color
              }
              sx={{ borderRadius: 99, width: 48, height: 48, mr: 2 }}
            >
              {createAvatar(option.userName).name}
            </Avatar>
            <Stack sx={{ ml: 0.5 }}>
              <Typography> {option.userId}</Typography>
              <Typography> {option.userName}</Typography>
            </Stack>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            variant="standard"
            {...params}
            label="Search User..."
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchAutoComplete;
