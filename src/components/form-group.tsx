export function FormGroup(props: any) {
  return (
    <div className="form-group">
      <label htmlFor={props.htmlFor}>{props.label}</label>
      {props.children}
    </div>
  );
}
