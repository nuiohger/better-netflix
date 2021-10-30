import VideoController from '../VideoController'

export default interface IAction {
  key: string;

  execute(videoController: VideoController): void;
}
