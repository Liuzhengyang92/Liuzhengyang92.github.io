import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ReactTableContainer from 'react-table-container';

const styles = theme => ({
  root: {
    width: '99%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  }  
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
  createData('Zone 8', 79, 108),
  createData('Total:', 159+237+262+305+356+146+65+79, 60+90+160+37+160+298+111+108)
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
    <ReactTableContainer height="385px" width='555px'>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Zone Name</CustomTableCell>
            <CustomTableCell>In Number</CustomTableCell>
            <CustomTableCell>Out Number</CustomTableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
        
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" width="100px">
                  {row.Zonename}
                </TableCell>
                <TableCell>{row.InNumber}</TableCell>
                <TableCell>{row.OutNumber}</TableCell>
              </TableRow>
            );
          })}
         
        </TableBody>
      </Table>   
    </ReactTableContainer>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);