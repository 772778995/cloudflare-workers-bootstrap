type Validation = {
  /** 检验对象 */
  <Cls extends abstract new (...args: any) => any>(cls: Cls, obj: any): Promise<InstanceType<Cls>>
  /** 检验 query 对象 */
  query: <Cls extends abstract new (...args: any) => any>(cls: Cls) => Promise<InstanceType<Cls>>
  /** 检验 body 对象 */
  body: <Cls extends abstract new (...args: any) => any>(cls: Cls) => Promise<InstanceType<Cls>>
}
