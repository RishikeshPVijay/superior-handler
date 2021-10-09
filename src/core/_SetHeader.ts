export type Header = {
  [key: string]: boolean | string | any;
};

class SetHeaderClass {
  header: Header;
  constructor(header: Header) {
    this.header = header || true;
  }
}

const SetHeader = (header: Header) => new SetHeaderClass(header);

export default SetHeader;
