const React = require('react');

/*  all child components   */
const Track = require('./Track');

class Home extends React.Component{
	componentDidMount(){
		$(this.props.affix).affix({
			offset: {
				bottom: 700
			}
		});
	}

	render(){
		return (
            <div id="alloc">
				<Track status={[1, 0, 0]}/>
				<div className="row">
					<div className="col-xs-8">
						<div className="page-header">
							<h1>Science Block</h1>
						</div>

						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Room S201</h3>
							</div>
							<div className="panel-body">
								Panel conten
							</div>
						</div>

						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Room S201</h3>
							</div>
							<div className="panel-body">
								Panel conten
							</div>
						</div>

						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Room S201</h3>
							</div>
							<div className="panel-body">
								Panel conten
							</div>
						</div>

						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Room S201</h3>
							</div>
							<div className="panel-body">
								Panel conten
							</div>
						</div>

						<div className="page-header">
							<h1>Humanities Block</h1>
						</div>

						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Room S201</h3>
							</div>
							<div className="panel-body">
								Panel conten
							</div>
						</div>

						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Room S201</h3>
							</div>
							<div className="panel-body">
								Panel conten
							</div>
						</div>

						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Room S201</h3>
							</div>
							<div className="panel-body">
								Panel conten
							</div>
						</div>

						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Room S201</h3>
							</div>
							<div className="panel-body">
								Panel conten
							</div>
						</div>

					</div>
					<div className="col-xs-4">
						<div className="page-header">
							<h1>Combinations</h1>
						</div>
						<div className="well affix" ref="affix">
							<a className="btn btn-success">1BCA <span className="badge">56</span></a>
							<a className="btn btn-success">1BVC <span className="badge">23</span></a>
							<a className="btn btn-success">1PCM <span className="badge">14</span></a>
							<a className="btn btn-success">1BVoc <span className="badge">45</span></a>
							<a className="btn btn-success">1MEC <span className="badge">76</span></a>
							<a className="btn btn-success">1MCZ <span className="badge">39</span></a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Home;
