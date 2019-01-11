import React from 'react';
import dataStorage from '../../dataStorage';
import axios from 'axios';
import { getMarketHistoricalQuotesUrl } from '../../helpers/requests'
import Particles from 'react-particles-js';

export default class Alpha extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rev_2016: 0,
            rev_2017: 0
        }
    }


    render() {
        return (
            <div>
                <div>
                    Alpha1: Backtest alpha1:
                </div>
                <Particles
                    params={{
                        "particles": {
                            "number": {
                                "value": 50
                            },
                            "size": {
                                "value": 3
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }} />
                <Particles
                    params={{
                        "particles": {
                            "number": {
                                "value": 160,
                                "density": {
                                    "enable": false
                                }
                            },
                            "size": {
                                "value": 3,
                                "random": true,
                                "anim": {
                                    "speed": 4,
                                    "size_min": 0.3
                                }
                            },
                            "line_linked": {
                                "enable": false
                            },
                            "move": {
                                "random": true,
                                "speed": 1,
                                "direction": "top",
                                "out_mode": "out"
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "bubble"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            },
                            "modes": {
                                "bubble": {
                                    "distance": 250,
                                    "duration": 2,
                                    "size": 0,
                                    "opacity": 0
                                },
                                "repulse": {
                                    "distance": 400,
                                    "duration": 4
                                }
                            }
                        }
                    }} />
                <Particles
                    params={{
                        "fps_limit": 28,
                        "particles": {
                            "number": {
                                "value": 200,
                                "density": {
                                    "enable": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 30,
                                "opacity": 0.4
                            },
                            "move": {
                                "speed": 1
                            },
                            "opacity": {
                                "anim": {
                                    "enable": true,
                                    "opacity_min": 0.05,
                                    "speed": 2,
                                    "sync": false
                                },
                                "value": 0.4
                            }
                        },
                        "polygon": {
                            "enable": true,
                            "scale": 0.5,
                            "type": "inline",
                            "move": {
                                "radius": 10
                            },
                            "url": "https://rpj.bembi.org/small-deer.2a0425af.svg",
                            "inline": {
                                "arrangement": "equidistant"
                            },
                            "draw": {
                                "enable": true,
                                "stroke": {
                                    "color": "rgba(255, 255, 255, .2)"
                                }
                            }
                        },
                        "retina_detect": false,
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "bubble"
                                }
                            },
                            "modes": {
                                "bubble": {
                                    "size": 6,
                                    "distance": 40
                                }
                            }
                        }
                    }} />

                <div>
                    Required:
                    Revenue Increase over years from 2016-2017 <span className={this.state.rev_2016 < this.state.rev_2017 ? 'green' : 'red'}>{this.state.rev_2016} {this.state.rev_2017}</span>
                </div>
                <div>
                    Target:
                </div>
                <div>
                    Percent:
                </div>



            </div>
        );
    }

    componentDidMount() {
        let url = 'https://svr2.fireant.vn/api/Data/Finance/YearlyFinancialInfo?symbol=SBT&fromYear=2015&toYear=2018'
        axios.get(url)
            .then(response => {
                let rev_2017 = response.data[0].Sales
                let rev_2016 = response.data[1].Sales
                this.setState({
                    rev_2016,
                    rev_2017
                })
            })
            .catch(error => {
                console.log(error)
            })
        url = getMarketHistoricalQuotesUrl('SBT')
        axios.get(url)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}