import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '99%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
});

let id = 0;
function createData(Zonename, InNumber, OutNumber) {
  id += 1;
  return { id, Zonename, InNumber, OutNumber };
}

const rows = [
  createData('Zone 1', 159, 60),
  createData('Zone 2', 237, 90),
  createData('Zone 3', 262, 160),
  createData('Zone 4', 305, 37),
  createData('Zone 5', 356, 160),
  createData('Zone 6', 146, 298),
  createData('Zone 7', 65, 111),
  createData('Total:', 159+237+262+305+356+146+65, 60+90+160+37+160+298+111)
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Zone Name</TableCell>
            <TableCell numeric>In Number</TableCell>
            <TableCell numeric>Out Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.Zonename}
                </TableCell>
                <TableCell numeric>{row.InNumber}</TableCell>
                <TableCell numeric>{row.OutNumber}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);