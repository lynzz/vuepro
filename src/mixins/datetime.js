import moment from "moment";

export default {
  data() {
    let startTime = moment().subtract(1, "month");
    let endTime = moment();
    return {
      startTime,
      endTime,
      startPickerOptions: {
        disabledDate(time) {
          return time.getTime() > endTime.valueOf();
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() || time.getTime() < startTime.valueOf()
          );
        }
      }
    };
  },
  watch: {
    startTime(val) {
      if (val) {
        this.updateStartPicker(val);
      }
    },
    endTime(val) {
      if (val) {
        this.updateEndPicker(val);
      }
    }
  },
  methods: {
    updateStartPicker(val) {
      this.endPickerOptions = {
        disabledDate(time) {
          return time.getTime() < val.valueOf() || time.getTime() > Date.now();
        }
      };
    },
    updateEndPicker(val) {
      this.startPickerOptions = {
        disabledDate(time) {
          return time.getTime() > val.valueOf();
        }
      };
    }
  }
};
