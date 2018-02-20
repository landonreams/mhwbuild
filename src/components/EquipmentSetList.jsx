import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import EquipmentSetCard from "./EquipmentSetCard";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  showMoreContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "8px"
  }
});

class EquipmentSetList extends Component {
  constructor() {
    super();
    this.state = {
      lastIndex: 30
    };
  }

  handleShowMore = () => {
    const { matchingEquipmentSets } = this.props;

    this.setState({
      lastIndex:
        matchingEquipmentSets.length > this.state.lastIndex
          ? this.state.lastIndex + 30
          : matchingEquipmentSets.length
    });
  };

  render() {
    const { matchingEquipmentSets, classes } = this.props;
    //to paginate, first we slice into pages of 30
    //keep track of the page number and enable show more.
    const paginated = matchingEquipmentSets.slice(
      0,
      matchingEquipmentSets.length > this.state.lastIndex
        ? this.state.lastIndex
        : matchingEquipmentSets.length
    );
    return (
      <div>
        <Grid container spacing={8}>
          {paginated.map((set, index) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <EquipmentSetCard key={index} set={set} index={index} />
              </Grid>
            );
          })}
        </Grid>
        {this.state.lastIndex < matchingEquipmentSets.length ? (
          <div className={classes.showMoreContainer}>
            <Button color="primary" onClick={this.handleShowMore}>
              Show More
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

EquipmentSetList.propTypes = {};

export default withStyles(styles)(EquipmentSetList);