import { type Components, type Theme } from "@mui/material";
import Accordion from "./Accordion";
import Alert from "./Alert";
import Autocomplete from "./Autocomplete";
import Avatar from "./Avatar";
import Backdrop from "./Backdrop";
import Badge from "./Badge";
import Breadcrumbs from "./Breadcrumbs";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Card from "./Card";
import Checkbox from "./Checkbox";
import Chip from "./Chip";
import ControlLabel from "./ControlLabel";
import CssBaseline from "./CssBaseline";
import DataGrid from "./DataGrid";
import Dialog from "./Dialog";
import Drawer from "./Drawer";
import Fab from "./Fab";
import Input from "./Input";
import Link from "./Link";
import Lists from "./List";
import LoadingButton from "./LoadingButton";
import Menu from "./Menu";
import Pagination from "./Pagination";
import Paper from "./Paper";
import Popover from "./Popover";
import Progress from "./Progress";
import Radio from "./Radio";
import Rating from "./Rating";
import Select from "./Select";
import Skeleton from "./Skeleton";
import Slider from "./Slider";
import Stepper from "./Stepper";
import SvgIcon from "./SvgIcon";
import Switch from "./Switch";
import Table from "./Table";
import Tabs from "./Tabs";
import Timeline from "./Timeline";
import ToggleButton from "./ToggleButton";
import Tooltip from "./Tooltip";
import TreeView from "./TreeView";
import Typography from "./Typography";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme): Components<Theme> {
  return {
    ...Accordion(theme),
    ...Alert(theme),
    ...Autocomplete(theme),
    ...Avatar(theme),
    ...Backdrop(theme),
    ...Badge(),
    ...Breadcrumbs(theme),
    ...Button(theme),
    ...ButtonGroup(theme),
    ...Card(theme),
    ...Checkbox(theme),
    ...Chip(theme),
    ...ControlLabel(theme),
    ...CssBaseline(),
    ...DataGrid(theme),
    ...Dialog(theme),
    ...Drawer(theme),
    ...Fab(theme),
    ...Input(theme),
    ...Link(),
    ...Lists(theme),
    ...LoadingButton(),
    ...Menu(theme),
    ...Pagination(theme),
    ...Paper(theme),
    ...Popover(theme),
    ...Progress(theme),
    ...Radio(theme),
    ...Rating(theme),
    ...Select(),
    ...Skeleton(theme),
    ...Slider(theme),
    ...Stepper(theme),
    ...SvgIcon(),
    ...Switch(theme),
    ...Table(theme),
    ...Tabs(theme),
    ...Timeline(theme),
    ...ToggleButton(theme),
    ...Tooltip(theme),
    ...TreeView(theme),
    ...Typography(theme),
  };
}
