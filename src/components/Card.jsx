import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { styles } from "../components/MaterialUi";
import { AiTwotoneEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs"
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions"

class Cardcomp extends Component {
  state = {
    color: ""
  };

  changeColor = () => {
    if(this.state.color){
      this.setState({ color: "" })
    } else {
      this.setState({ color: "red" })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card style={{ backgroundColor: "white" }} variant="outlined">
          <CardMedia
            className={classes.media}
            image={this.props.foto}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {this.props.judul}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '10px' }}>
              {this.props.caption}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={this.changeColor} style={{color: this.state.color}}>
              <BsFillHeartFill />
            </IconButton>
            <IconButton onClick={this.props.onDelete}>
              <BiTrash />
            </IconButton>
            <IconButton onClick={this.props.onEdit} >
              <AiTwotoneEdit />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Cardcomp);