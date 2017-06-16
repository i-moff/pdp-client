import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {API_BASE_URL} from '../config/main';
import io from 'socket.io-client';
const socket = io.connect(API_BASE_URL);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        //todo: remove it
        this.props.protectedTest();

        this.state = {
            drawing: false,
            cursors: {},
            clients: {},
            prev: {},
            lastEmit: Date.now(),
            id: Math.round(Date.now() * Math.random())
        };

        socket.on('moving', (data) => {
            this.onServerMovingSocketEvent(data);
        });
    }

    onMouseMove(e) {
        let nowDate = Date.now();

        if (this.state.drawing) {
            if (nowDate - this.state.lastEmit > 30) {
                socket.emit('mousemove', {
                    'x': e.pageX,
                    'y': e.pageY,
                    'drawing': this.state.drawing,
                    'id': this.state.id
                });
                this.state.lastEmit = Date.now();
            }

            this.drawLine(this.state.prev.x, this.state.prev.y, e.pageX, e.pageY);
            this.state.prev.x = e.pageX;
            this.state.prev.y = e.pageY;
        }
    }

    onMouseDown(e) {
        this.setState({
            drawing: true,
            prev: {
                x: e.pageX,
                y: e.pageY
            }
        });
    }

    onMouseUpAndLeave(e) {
        this.setState({drawing: false});
    }

    componentDidMount() {
        this.setState({
            canvas: document.getElementById('paper'),
            ctx: document.getElementById('paper').getContext('2d')
        });
    }

    render() {
        return (
            <div className="dashboard">
                <div id="cursors"></div>
                <canvas id="paper" width="1800" height="1200"
                        onMouseMove={this.onMouseMove.bind(this)} onMouseDown={this.onMouseDown.bind(this)}
                        onMouseLeave={this.onMouseUpAndLeave.bind(this)} onMouseUp={this.onMouseUpAndLeave.bind(this)}>
                    Your browser needs to support canvas for this to work!
                </canvas>
            </div>
        );
    }


    onServerMovingSocketEvent(data) {
        if (data.drawing && this.state.clients[data.id]) {
            this.drawLine(this.state.clients[data.id].x, this.state.clients[data.id].y, data.x, data.y);
        }

        // Saving the current client state
        this.state.clients[data.id] = data;
        this.state.clients[data.id].updated = Date.now();
    }

    drawLine(fromx, fromy, tox, toy) {
        this.state.ctx.moveTo(fromx, fromy);
        this.state.ctx.lineTo(tox, toy);
        this.state.ctx.stroke();
    }
}

function mapStateToProps(state) {
    return {content: state.auth.content};
}


export default connect(mapStateToProps, actions)(Dashboard);