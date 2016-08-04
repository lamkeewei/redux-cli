import ProjectSettings from './project-settings';
import UI from './ui';

class SubCommand {
  constructor(options = {}) {
    this.rawOptions = options;
    this.ui = options.ui || new UI();
    try {
      this.settings = options.settings || new ProjectSettings();
    } catch(err) {
      this.ui.writeError('.reduxrc is invalid.');
      process.exit(1);
    }

    this.environment = {
      ui: this.ui,
      settings: this.settings
    };
  }

  run() {
    throw new Error('Subcommands must implement a run()');
  }

  availableOptions() {
    throw new Error('Subcommands must implement an availableOptions()');
  }
}

export default SubCommand;
