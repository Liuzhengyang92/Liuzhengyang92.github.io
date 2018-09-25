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
function createData(MacAddress, Times) {
  id += 1;
  return { id, MacAddress, Times };
}

const rows = [
  createData('18:f1:d8:ec:28:16', 337),
  createData('dc:a9:04:5f:20:c4', 262),
  createData('08:c5:e1:18:a2:18', 205),
  createData('60:f8:1d:18:18:bf', 156),
  createData('1c:cb:99:4d:3e:3a', 146),
  createData('48:4b:aa:81:b5:25', 125),
  createData('28:ff:3c:49:d9:2b', 111),
  createData('18:f6:43:92:2c:d4', 107),
  createData('e8:50:8b:5c:2c:e4', 98),
  createData('e8:50:8b:8c:ae:db', 87),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Mac Address</TableCell>
            <TableCell numeric>Visit Times</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.MacAddress}
                </TableCell>
                <TableCell numeric>{row.Times}</TableCell>
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