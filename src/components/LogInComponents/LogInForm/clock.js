import React from "react";

class Clock extends React.Component {


  constructor(props) {

    super(props)

    this.state = {
      time: new Date()
    }
  }

  componentDidMount() {

    this.interval = setInterval(this.update, 9000)

  }


  componentWillUnmount() {
    clearInterval(this.interval)
  }

  update = () => {

    this.setState({
      time: new Date()
    })

  };

  render() {

    const h = this.state.time.getHours()
    const m = this.state.time.getMinutes()
    const s = this.state.time.getSeconds()

    return (

      <h4 className={"text-center"}>{h}:{(m < 10 ? '0' + m : m)}:{(s < 10 ? '0' + s : s)}</h4>

    )

  }

}

export default Clock