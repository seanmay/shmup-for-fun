import * as React from "react";
import styles from "./editor.css";

const previewCanvas = React.createRef();
const gridCanvas = React.createRef();

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapdata: {
        name: "",
        soundtrack: "",
        gridWidth: 24,
        gridHeight: 28,
        distance: 10000,
        elevation: 20000,
        layers: [
          {
            elevation: 18000,
            tiles: []
          },
          {
            elevation: 1500,
            tiles: []
          },
          {
            elevation: 10000,
            tiles: []
          }
        ]
      }
    };
    this.canvasContainer = React.createRef();
  }
  updateMapData(name, data) {
    this.setState(state => ({
      mapdata: Object.assign({}, state.mapdata, { [name]: data })
    }));
  }
  componentDidMount() {
    [...this.canvasContainer.current.children].forEach(canvas => {
      console.log(canvas);
    });
  }
  render() {
    return (
      <div className={styles.Editor}>
        <section className={styles["Editor-forms"]}>
          <div
            onChange={e => this.updateMapData(e.target.name, e.target.value)}
          >
            <label>
              name: <input name="name" value={this.state.mapdata.name} />
            </label>
          </div>
        </section>
        <section className={styles["Editor-view"]}>
          <EditorView
            layerCount={this.state.mapdata.layers.length}
            ref={this.canvasContainer}
          />
        </section>
      </div>
    );
  }
}

const EditorView = React.forwardRef(
  ({ layerCount, width, height, gridWidth, gridHeight }, ref) => (
    <div style={{ position: "relative" }} ref={ref}>
      {Array.from({ length: layerCount }).map((_, i) => (
        <canvas key={`layer-${i}`} className={styles["Editor-canvas"]} />
      ))}
      <canvas className={styles["Editor-canvas"]} />
    </div>
  )
);
