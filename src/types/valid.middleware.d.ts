type Validation = {
  /** 检验对象 */
  <Cls>(cls: Cls, obj: any): Promise<InstanceType<Cls>>
  /** 检验 query 对象 */
  query: <Cls>(cls: Cls) => Promise<InstanceType<Cls>>
  /** 检验 body 对象 */
  body: <Cls>(cls: Cls) => Promise<InstanceType<Cls>>
}
