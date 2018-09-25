import React, {Component} from 'react'

import {Line} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Aux from '../../hocs/Auxiliary/Auxiliary';
import classes from "./GeoMonitorCard.css";


class GeoMonitorCard extends Component {
    state={
        enable: true
    }

    handlerEnableSwitch = () => {
        const pre = this.state.enable
        this.setState({
            ...this.state,
            enable: !pre}
        )
    }

    render () {
        return (
            <Aux>
                <div style={{padding: 5}}>
                <Paper classes={{root: classes.ctl_content}}>
                    <Grid justify="space-between" container>
                        <Grid>
                            <Typography variant="headline">{this.props.title}</Typography>                                            
                        </Grid>
                        <Grid>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.enable}
                                            onChange={this.handlerEnableSwitch}
                                            color="secondary"
                                        />
                                    }
                                    label="Enable"
                                />
                            </FormGroup>
                        </Grid>
                        { this.state.enable ?
                            <Grid item xs={12}>
                                {this.props.children}
                                { this.props.data !== undefined ?
                                    <Line height={100} data={this.props.data} /> : null
                                }
                            </Grid> : null
                        }
                    </Grid>
                </Paper>
                </div>
            </Aux>
        )
    }
}

export default GeoMonitorCard;