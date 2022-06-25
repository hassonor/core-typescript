import {WinsAnalysis} from "./analyzers/WinsAnalysis";
import {MatchData} from "./MatchData";
import {HtmlReport} from "./reoportTargets/HtmlReport";

export interface Analyzer {
    run(matches: MatchData[]): string;
}

export interface OutputTarget {
    print(report: string): void;
}

export class Summary {
    static winsAnalysisWithHtmlReport(team: string): Summary {
        return new Summary(
            new WinsAnalysis(team),
            new HtmlReport()
        );
    }

    constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {
    }

    buildAndPrintReport(matches: MatchData[]): void {
        const reportOutput = this.analyzer.run(matches);
        this.outputTarget.print(reportOutput);
    }

}