import * as React from "react";
import { TimelineMarkersConsumer } from "../TimelineMarkersContext";
import { TimelineMarkerType } from "../markerType";
type CustomMarkerProps = {
  subscribeMarker: (...args: any[]) => any,
  updateMarker: (...args: any[]) => any,
  date: number
};
class CustomMarker extends React.Component<CustomMarkerProps, {}> {
  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date && this.getMarker) {
      const marker = this.getMarker();
      this.props.updateMarker({ ...marker, date: this.props.date });
    }
  }
  componentDidMount() {
    const { unsubscribe, getMarker } = this.props.subscribeMarker({
      type: TimelineMarkerType.Custom,
      renderer: this.props.children,
      date: this.props.date
    });
    this.unsubscribe = unsubscribe;
    this.getMarker = getMarker;
  }
  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
  render() {
    return null;
  }
}
// TODO: turn into HOC?
const CustomMarkerWrapper = props => {
  return (
    <TimelineMarkersConsumer>
      {({ subscribeMarker, updateMarker }) => (
        <CustomMarker
          subscribeMarker={subscribeMarker}
          updateMarker={updateMarker}
          {...props}
        />
      )}
    </TimelineMarkersConsumer>
  );
};
CustomMarkerWrapper.displayName = "CustomMarkerWrapper";
export default CustomMarkerWrapper;
