import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, mac, gender, visit_times, dwell_time) {
  id += 1;
  return { id, name, mac, gender, visit_times, dwell_time };
}

const rows = [
  createData('Meien', '2c:0e:3d:18:d8:55', 'female', 10, 78),
  createData('kelly', 'b0:70:2d:90:27:5d', 'female', 10, 73),
  createData('allen', 'e4:9a:79:26:09:89', 'male', 9, 60),
  createData('jdjfjjf', '2c:33:61:99:2e:ce', 'male', 9, 53),
  createData('Sudimin', 'b4:f7:a1:c3:57:c9', 'male', 8, 39),
];

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>name </CustomTableCell>
            <CustomTableCell >mac</CustomTableCell>
            <CustomTableCell >gender</CustomTableCell>
            <CustomTableCell >visit times</CustomTableCell>
            <CustomTableCell >dwell time(min)</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell >{row.mac}</CustomTableCell>
                <CustomTableCell >{row.gender}</CustomTableCell>
                <CustomTableCell >{row.visit_times}</CustomTableCell>
                <CustomTableCell >{row.dwell_time}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);