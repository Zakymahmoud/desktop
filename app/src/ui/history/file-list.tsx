import * as React from 'react'
import { FileChange, mapStatus, iconForStatus } from '../../models/status'
import { PathLabel } from '../lib/path-label'
import { Octicon } from '../octicons'
import { List } from '../list'

interface IFileListProps {
  readonly files: ReadonlyArray<FileChange>
  readonly selectedFile: FileChange | null
  readonly onSelectedFileChanged: (file: FileChange) => void
}

export class FileList extends React.Component<IFileListProps, void> {
  private onSelectionChanged(row: number) {
    const file = this.props.files[row]
    this.props.onSelectedFileChanged(file)
  }

  private renderFile(row: number) {
    const file = this.props.files[row]
    const status = file.status
    const fileStatus = mapStatus(status)

    return <div className='file'>

      <PathLabel path={file.path}
                 oldPath={file.oldPath}
                 status={file.status} />

      <div className='status'>
        <Octicon symbol={iconForStatus(status)}
                 className={'status-' + fileStatus.toLowerCase()}
                 title={fileStatus} />
      </div>
    </div>
  }

  private rowForFile(file: FileChange | null): number {
    return file
      ? this.props.files.findIndex(f => f.path === file.path)
      : -1
  }

  public render() {
    return (
      <div className='file-list'>
        <List rowRenderer={row => this.renderFile(row)}
              rowCount={this.props.files.length}
              rowHeight={40}
              selectedRow={this.rowForFile(this.props.selectedFile)}
              onSelectionChanged={row => this.onSelectionChanged(row)}/>
      </div>
    )
  }
}
